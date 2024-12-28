export const isDark = (c, limit = 128) => {
    let rgb;
    let r;
    let g;
    let b;
    if (c[0] == '#') {
        c = c.substring(1);      // strip #
    }
    if (c.indexOf('rgb') > -1) {
        c = c.substring(4, 17);      // strip #
        rgb = c.split(', ');
        r = parseInt(rgb[0]);  // extract red
        g = parseInt(rgb[1]);  // extract green
        b = parseInt(rgb[2]);  // extract blue
    } else {
        rgb = parseInt(c, 16);   // convert rrggbb to decimal
        r = (rgb >> 16) & 0xff;  // extract red
        g = (rgb >> 8) & 0xff;  // extract green
        b = (rgb >> 0) & 0xff;  // extract blue
    }

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    return luma < limit;
}