export const distance = (deliveryOrigin, deliveryDestiny) => {
    if (deliveryOrigin === 'Porto' && deliveryDestiny === 'Porto') {
        return 40;
    } else if (
        (deliveryOrigin === 'Porto' && deliveryDestiny === 'Coimbra') ||
        (deliveryOrigin === 'Coimbra' && deliveryDestiny === 'Porto')
    ) {
        return 128.9;
    } else if (
        (deliveryOrigin === 'Porto' && deliveryDestiny === 'Lisboa') ||
        (deliveryOrigin === 'Lisboa' && deliveryDestiny === 'Porto')
    ) {
        return 313.3;
    } else if (
        (deliveryOrigin === 'Porto' && deliveryDestiny === 'Évora') ||
        (deliveryOrigin === 'Évora' && deliveryDestiny === 'Porto')
    ) {
        return 410.4;
    } else if (
        (deliveryOrigin === 'Porto' && deliveryDestiny === 'Faro') ||
        (deliveryOrigin === 'Faro' && deliveryDestiny === 'Porto')
    ) {
        return 554.2;
    } else if (deliveryOrigin === 'Coimbra' && deliveryDestiny === 'Coimbra') {
        return 30;
    } else if (
        (deliveryOrigin === 'Coimbra' && deliveryDestiny === 'Lisboa') ||
        (deliveryOrigin === 'Lisboa' && deliveryDestiny === 'Coimbra')
    ) {
        return 202.7;
    } else if (
        (deliveryOrigin === 'Coimbra' && deliveryDestiny === 'Évora') ||
        (deliveryOrigin === 'Évora' && deliveryDestiny === 'Coimbra')
    ) {
        return 243.7;
    } else if (
        (deliveryOrigin === 'Coimbra' && deliveryDestiny === 'Faro') ||
        (deliveryOrigin === 'Faro' && deliveryDestiny === 'Coimbra')
    ) {
        return 443.6;
    } else if (deliveryOrigin === 'Lisboa' && deliveryDestiny === 'Lisboa') {
        return 50;
    } else if (
        (deliveryOrigin === 'Lisboa' && deliveryDestiny === 'Évora') ||
        (deliveryOrigin === 'Évora' && deliveryDestiny === 'Lisboa')
    ) {
        return 133.6;
    } else if (
        (deliveryOrigin === 'Lisboa' && deliveryDestiny === 'Faro') ||
        (deliveryOrigin === 'Faro' && deliveryDestiny === 'Lisboa')
    ) {
        return 277.5;
    } else if (deliveryOrigin === 'Évora' && deliveryDestiny === 'Évora') {
        return 25;
    } else if (
        (deliveryOrigin === 'Évora' && deliveryDestiny === 'Faro') ||
        (deliveryOrigin === 'Faro' && deliveryDestiny === 'Évora')
    ) {
        return 287;
    } else if (deliveryOrigin === 'Faro' && deliveryDestiny === 'Faro') {
        return 35;
    }
};
