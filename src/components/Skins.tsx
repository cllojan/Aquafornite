'use client'

import { OrderSkins } from "@/utils/OrderSkins";
import { useState, useMemo, FormEvent } from "react";
import Skin, {  SkinWithDiscount } from "@/interfaces/skin.interface";

import SkinGridInfinite from '@/components/InfiniteSkins';

const Skins = ({ skins, categories }: { skins: SkinWithDiscount[], categories: string[] }) => {

  const [searchQuery, setSearchQuery] = useState("");

  const [rarity, setRarity] = useState("All");
  const [category, setCategory] = useState("Todos");

  const [sortBy, setSortBy] = useState("");

  const [listSkins, setListSkins] = useState<Skin[]>([]);
  const [listCategory, setListCategory] = useState<string[]>(["Todos"]);



  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setSearchQuery(formData.get("search") as string);
    setRarity(formData.get("rarity") as string);
    setCategory(formData.get("category") as string);
    console.log(formData.get('search') as string)

  }

  const filteredSkins = useMemo(() => {
    return OrderSkins(skins, {
      rarity: rarity,
      category: category,
      search: searchQuery,
      sortBy: sortBy,
    })

  }, [rarity, category, searchQuery,sortBy])


  const rari = [
    { key: "All", label: "Todos" },
    { key: "epic", label: "Épico" },  
    { key: "rare", label: "Raro" },
    { key: "icon", label: "Serie de Idolos" },
    { key: "uncommon", label: "Poco común" },
  ]

   const sortByItems = [
    { key: "price_desc", label: "Mayor a Menor" },
    { key: "price_asc", label: "Menor a Mayor" },    
    { key: "name_asc", label: "Ascendente" },
    { key: "name_desc", label: "Descendente" },    
  ]
  return (
    <main className="pt-20 w-full flex flex-col  min-h-screen p-2 bg-[radial-gradient(ellipse_at_left,_#0774BB_0%,_#052F6F_75%,_#040A3F_100%)] bg-fixed">
      <div className="w-full bg-content1 p-6">

        <form className="flex flex-col md:flex-row gap-4 flex-wrap">
          <div className="w-full md:flex-1 ">
            <input
              onChange={e => setSearchQuery(e.target.value)}
              
              type="search"
              placeholder="Buscar por el nombre de la skin"
              className="inputs border-none placeholder-white-50 font-poppins rounded-[8px] text-white w-full bg-black/30 backdrop-blur-md input outline-[2px] outline-transparent outline-offset-2 hover:outline-2px hover:outline-blue-100"
              name="search"
            />
          </div>
          
          <div className="w-full md:w-64">
            <select
              defaultValue=" Pick a color"
              className="select w-full border-none placeholder-white-50 font-poppins rounded-[8px] text-white w-full bg-black/30 backdrop-blur-md outline-[2px] outline-transparent outline-offset-2 hover:outline-2px hover:outline-blue-100"
              onChange={e => setRarity(e.target.value)}
              name="rarity"
            >
              {rari.map((item) => (
                <option
                  key={item.key}
                  value={item.key}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-64">
            <select
              onChange={e => setCategory(e.target.value)}
              className=" w-full select border-none placeholder-white-50 font-poppins rounded-[8px] text-white w-full bg-black/30 backdrop-blur-md outline-[2px] outline-transparent outline-offset-2 hover:outline-2px hover:outline-blue-100"
              name="category"
            >
              {categories?.map((item, inx) => (
                <option
                  key={inx}
                  value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/** 
           * 
           <div className="w-full md:w-auto md:self-end">
            <button className="btn btn-active btn-primary" type="submit">Filtrar</button>
          </div>
          */}
          <div className="w-full md:w-64">
            <select
              defaultValue="Pick a color"
              className=" w-full select border-none placeholder-white-50 font-poppins rounded-[8px] text-white w-full bg-black/30 backdrop-blur-md outline-[2px] outline-transparent outline-offset-2 hover:outline-2px hover:outline-blue-100"
              name="order"
              onChange={e => {
                setSortBy(e.target.value)
              }}
            >
              {sortByItems.map((item) => (
                <option
                  key={item.key}
                  value={item.key}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>

        </form>

      </div>
      <SkinGridInfinite groupedSkins={filteredSkins.filteredSkins} />
    </main>
  );
}

export default Skins;
