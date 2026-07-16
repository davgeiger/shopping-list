import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState, type SetStateAction } from "react"
import type { ShoppingItem } from "@/types/shopping"
import { toast } from "sonner"

type ShoppingInputProps = {
  shoppingList: ShoppingItem[]
  setShoppingList: React.Dispatch<SetStateAction<ShoppingItem[]>>
}

export default function ShoppingInput({
  shoppingList,
  setShoppingList,
}: ShoppingInputProps) {
  const [product, setProduct] = useState("")
  const [amount, setAmount] = useState(1)

  return (
    <div className="flex flex-col">
      <div className="mb-2 flex gap-2">
        <Input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Produkt eingeben..."
        />
        <Input
          min="1"
          type="number"
          placeholder="1"
          className="w-12 px-1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <Button
        onClick={() => {
          const exists = shoppingList.some(
            (item) => item.name.toLowerCase() === product.toLowerCase()
          )

          if (exists) {
            toast.error("Produkt bereits vorhanden", {
              description: `"${product}" befindet sich bereits auf der Einkaufsliste.`,
            })
            return
          }

          setShoppingList((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              name: product,
              amount,
              done: false,
            },
          ])
        }}
      >
        Eintrag hinzufügen
      </Button>
    </div>
  )
}
