'use client'

export const SearchInput = ({onChange}:{onChange:(value:string) => void}) => {
    return (
      <input
      type="Buscar"
      placeholder="Buscar skin..."
      onChange = {(e )=> onChange(e.target.value)}
      className=" w-full input"

    />
    )
}