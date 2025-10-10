import Header from '@/components/Header';
import Skins from '@/components/Skins';
import { getSkins } from "@/lib/getSkins";

export default async function Shop() {
  const {skins, categories} = await getSkins();  
  return (
    <div className="">                
      <Header/>
      <Skins skins={skins} categories={categories}/ >          
    </div>
  );
}
