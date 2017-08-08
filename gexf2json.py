import argparse
import json
from json import encoder
from lxml import etree

encoder.FLOAT_REPR = lambda f: format(f, '.6g')

BASE_W = 800
BASE_H = 700
PADDING = 30
MIN_EDGE_WIDTH = 1
MAX_EDGE_WIDTH = 50

parser = argparse.ArgumentParser()
parser.add_argument('input', type=argparse.FileType('r'), help='Input GEXF File')
parser.add_argument('output', nargs='?', type=argparse.FileType('w'), help='Output JSON File')
args = parser.parse_args()
tree = etree.parse(args.input)

base_nsmap = tree.getroot().nsmap
nsmap = {
    'g': base_nsmap[None],
    'viz': base_nsmap['viz'],
}

attribute_list = set()

# Normalizing positions and attribute list
node_x = []
node_y = []
for node in tree.xpath('//g:node', namespaces=nsmap):
    pos = node.xpath('viz:position', namespaces=nsmap)[0]
    node_x.append(float(pos.get('x')))
    node_y.append(float(pos.get('y')))
    attributes = node.xpath('g:attvalues/g:attvalue', namespaces=nsmap)
    attribute_list.update([(attribute.get('for') or attribute.get('id')) for attribute in attributes])
x_min = min(node_x)
x_max = max(node_x)
y_min = min(node_y)
y_max = max(node_y)
scale = min((BASE_W-PADDING)/(x_max-x_min),(BASE_H-PADDING)/(y_max-y_min))
offset_x = (BASE_W-scale*(x_min+x_max))/2
offset_y = (BASE_H-scale*(y_min+y_max))/2

attribute_list = list(attribute_list)
attribute_lookup = dict((v,k) for k,v in enumerate(attribute_list))
nodes = []
nodes_rgb = []
node_index = {}

graph_is_directed = ((tree.xpath('//g:graph/@defaultedgetype',namespaces=nsmap) or [''])[0] == 'directed')

print('Processing nodes')
k = 0

for node in tree.xpath('//g:node', namespaces=nsmap):
    id = node.get('id')
    label = node.get('label') or id
    pos = node.xpath('viz:position', namespaces=nsmap)[0]
    x = float(pos.get('x'))
    y = float(pos.get('y'))
    size = float(node.xpath('viz:size', namespaces=nsmap)[0].get('value'))
    color = node.xpath('viz:color', namespaces=nsmap)[0]
    r = int(color.get('r'))
    g = int(color.get('g'))
    b = int(color.get('b'))
    attributes = node.xpath('g:attvalues/g:attvalue', namespaces=nsmap)
    attributes = [[
        attribute_lookup[attribute.get('for') or attribute.get('id')],
        attribute.get('value'),
    ] for attribute in attributes]
    attributes.sort(key=lambda a: a[0])
    node_data = {
        'id': id,
        'l': label,
        'x': offset_x + scale * x,
        'y': offset_y - scale * y,
        'r': scale * size,
        'B': "rgba(%d,%d,%d,.7)"%(r,g,b),
        'G': "rgba(%d,%d,%d,.5)"%(tuple(84+.33*k for k in (r,g,b))),
        'a': attributes,
    }
    nodes.append(node_data)
    nodes_rgb.append((r,g,b))
    node_index[id] = k
    k += 1
    if not (k % 1000):
        print("%7d nodes processed"%k, end='\r')

print("Total: %d nodes processed"%k)

edges = []

def get_attribute(edge, attlabel, default):
    attribute = edge.xpath('g:attvalues/g:attvalue[@for="%s"]'%attlabel,namespaces=nsmap)
    return (attribute or [{'value':edge.get(attlabel)}])[0].get('value') or default

print('Processing edges')

k = 0
for edge in tree.xpath('//g:edge', namespaces=nsmap):
    edgesource = edge.get('source')
    edgetarget = edge.get('target')
    sourceindex = node_index[edgesource]
    targetindex = node_index[edgetarget]
    weight = float(get_attribute(edge, 'weight', 1))
    edge_is_directed = graph_is_directed
    directed_attr = edge.get('type')
    if directed_attr == 'directed':
        edge_is_directed = True
    if directed_attr == 'undirected':
        edge_is_directed = False
    owncolor = edge.xpath('viz:color', namespaces=nsmap)
    if owncolor:
        color = tuple(int(owncolor[0].get(k)) for k in ["r", "g", "b"])
    else:
        sourcecolor = nodes_rgb[sourceindex]
        targetcolor = nodes_rgb[targetindex]
        color = sourcecolor if edge_is_directed else tuple((sourcecolor[k] + targetcolor[k])/2 for k in range(3))
    edges.append({
        's': sourceindex,
        't': targetindex,
        'C': "rgba(%d,%d,%d,.7)"%color,
        'w': weight,
        'W': max(MIN_EDGE_WIDTH, min(MAX_EDGE_WIDTH, weight)) * scale,
        'l': get_attribute(edge, 'label', ''),
        'd': int(edge_is_directed),
    })
    k += 1
    if not (k % 1000):
        print("%7d edges processed"%k, end='\r')
        
print("Total: %d edges processed"%k)

res = {
    'nodeList': nodes,
    'edgeList': edges,
    'directed': int(graph_is_directed),
    'attributes': attribute_list,
}

if args.output is None:
    filename = ".".join(args.input.name.split(".")[:-1] + ['json'])
    output = open(filename,'w')
else:
    output = args.output

print("Saving to %s"%output.name)

json.dump(res, output)

output.close()
args.input.close()
