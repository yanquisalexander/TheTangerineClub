import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
export const FOURTHWALL_RSS_FEED = 'https://thetangerineclub-shop.fourthwall.com/.well-known/merchant-center/rss.xml';

export const getStoreProducts = async () => {
    const parser = new XMLParser();
    const response = await fetch(FOURTHWALL_RSS_FEED);
    const xml = await response.text();
    const parsedData = parser.parse(xml);

    const products: any[] = [];
    const itemGroupIds: Set<string> = new Set();

    for (const product of parsedData.rss.channel.item) {
        const itemGroupId = product['g:item_group_id'];
        if (!itemGroupIds.has(itemGroupId)) {
            products.push({
                title: product['g:title'],
                link: product['g:link'],
                description: product['g:description'],
                price: product['g:price'],
                image: product['g:image_link'],
            });
            itemGroupIds.add(itemGroupId);
        }

        if (products.length === 9) {
            break;
        }
    }

    return products;
}
