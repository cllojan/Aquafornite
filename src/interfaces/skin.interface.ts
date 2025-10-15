export interface brItems {    
    id:string;
    name:string;
    description:string;
    rarity:{
        value:string;
        displayValue:string;
        backendValue:string;
    };
}
export interface Tracks{
    added:string;
    albumArt:string;
    artist:string;
    devName:string;
    title:string;
    id:string;
}
export default interface Skin {
    mainId: string;
    displayName: string;
    devName:string;
    displayType:string;    
    finalPrice:number;    
    imageUrl: string; 
    discount:number;
    brItems:brItems[];
    bundle:{
        name: string;
        info: string;
        image: string;
    }
    layout: {
        id:string;
        name: string;
        rank:string;
    };
    layoutId:string;
    rarity:{
        id:string;
        name:string;
    };
    colors:{
        color1:string;
        color2:string;
        color3:string;
        textBackgroundColor:string;    
    }
    
    newDisplayAsset:{
        id:string;
        cosmeticId:string;                
        renderImages:any;
    };
    tileSize: string;
    tracks:Tracks[];
    sortPriority:number
}

export interface SkinWithDiscount extends Skin{
    discount: number;
}
export  interface SkinWithBlur extends Skin {
    blurDataURL: string;
}
