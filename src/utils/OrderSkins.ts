import Skin, { SkinWithDiscount } from "@/interfaces/skin.interface";
interface Layout{
    id:string,
    name:string,
    rank:number
}
enum SizeItem{
    "Size_4_x_1" = 1,
    "Size_3_x_1" = 2,
    "Size_2_x_1" = 3,
    "Size_1_x_1" = 4,
    
}
const prioritizedOrder:{[key:string]:number} = {
    'size4x1': 1,
    'size3x1': 2,
    'size2x1': 3,
    'size1x1': 4,
  };
export function OrderSkins(skins: SkinWithDiscount[], filters:{
    search? : string;
    rarity? : string;
    category? : string;
    sortBy?: string;
} = {}): { filteredSkins: Record<string, {layout:Layout, skins:Skin[]}>; categories: string[] } {
    let itemsFilter: Skin[] = skins

    itemsFilter = skins.filter(skin => {
        if (filters.search && !skin.layout?.name.toLowerCase().includes(filters.search.toLowerCase()) && !skin?.bundle?.name.toLowerCase().includes(filters.search.toLowerCase()) && !skin.tracks?.[0].title.toLowerCase().includes(filters.search.toLowerCase())) return false;
        if (filters.rarity && filters.rarity !== "All" && !skin.rarity?.id.includes(filters.rarity)) return false;
        if (filters.category && filters.category !== "Todos" && !skin.layout?.name.includes(filters.category)) return false;

        return true
    })
    
    let filteredSkins: Record<string, {layout:Layout, skins:Skin[]}> = {};
        //para tener un objeto que empeize con nombre de la categoria y las skins
        itemsFilter.forEach((item:any) => {
            const grupo = item.layout?.name.length <= 2 ? "" : item.layout?.name;
            const layout = item.layout;
            if (!filteredSkins[layout?.name]) {
                filteredSkins[layout?.name] = {
                    layout,
                    skins:[]
                };
            }
            filteredSkins[layout?.name].skins.push(item);
        })
            
    const skinsSorted = Object.values(filteredSkins).sort((a,b) => b.layout?.rank - a.layout?.rank)
    const orderedFilteredSkins: Record<string, {layout:Layout, skins:Skin[]}> = {};
    skinsSorted.forEach((item) => {
        orderedFilteredSkins[item.layout?.name] = item;
    })
       
    const categories = ["Todos", ...Object.keys(orderedFilteredSkins)];
    Object.values(orderedFilteredSkins).forEach(elemento =>{
        elemento.skins.sort((a,b) => {
            
            if(filters.sortBy === "price_asc"){
                return a.discount - b.discount;
            }
            if(filters.sortBy === "price_desc"){
                return b.discount - a.discount;
            }
            const aSizeOrder = prioritizedOrder[a.tileSize] || Infinity;
            const bSizeOrder = prioritizedOrder[b.tileSize] || Infinity;
            if(aSizeOrder !== bSizeOrder){
                return bSizeOrder - aSizeOrder
            }
            if (a.layoutId !== b.layoutId) {                
                return b.layoutId.localeCompare(a.layoutId);
              }
            return b.sortPriority - a.sortPriority
        })
    })
    
    return { filteredSkins:orderedFilteredSkins, categories }
}
