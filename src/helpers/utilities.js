export function getDomain(hostname){
    var parts = hostname.split(".");
    var domain = null;
    if (parts.length > 1){
        domain = parts[1];
    }
    return domain;
}

