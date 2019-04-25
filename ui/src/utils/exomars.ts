
// 2016-074T20:23:39.000Z
function parseDate(dateStr : string) : Date {
    const r = /([0-9]{4})-([0-9]{3})T([0-9]{2}):([0-9]{2}):([0-9]{2}).([0-9]{3})Z/;

    const [_all, y, yd, hh, mi, ss, ms] = r.exec(dateStr);

    let d = new Date();

    console.log('y=', y, 'yd=', yd);

    d.setYear(parseInt(y));
    console.log('d=', d);
    d.setTime(d.getTime() + 1000*3600*24*parseInt(yd))
    console.log('d=', d);
    d.setUTCHours(parseInt(hh));
    console.log('d=', d);
    d.setUTCMinutes(parseInt(mi));
    console.log('d=', d);
    d.setUTCSeconds(parseInt(ss));
    d.setUTCMilliseconds(parseInt(ms));

    return d;
}


export function exoConvert(content : string) :string {
    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(content,"text/xml");

    let events = xmlDoc.getElementsByTagName("events")[0].childNodes;
    let output = [];

    console.log('parse');
    for (let node of events) {
        if (node.nodeName.startsWith("#")) {
            continue;
        }
        let timeStr = node.attributes['time'].nodeValue;

        let time = parseDate(timeStr);

        let tags = "";
        for (let attr of node.attributes) {
            let name = attr.localName;
            let val = attr.nodeValue;
            if (name === 'time') {
                continue;
            }
            val = val.trim();
            if (name === 'count' || name == 'duration') {
                tags = `${tags},${name}=${val}`;
            }
            else {
                tags = `${tags},${name}="${val}"`;
            }
        }

        output.push(`${node.nodeName} ${tags.substring(1)} ${time.getTime()}`);
    }

    window.events = events;

    return output.join("\n");
}