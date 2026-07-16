import { useLocalStorage } from "./hooks/useLocalStorage"
import ShoppingInput from "./components/ShoppingInput"
import ShoppingList from "./components/ShoppingList"
import type { ShoppingItem } from "./types/shopping"
import { Toaster } from "@/components/ui/sonner"

function App() {
  const [shoppingList, setShoppingList] = useLocalStorage<ShoppingItem[]>(
    "shopping-list",
    []
  )
  return (
    <>
      <div className="mx-auto mt-2 w-96 text-center">
        <h1 className="mb-5 text-3xl">Einkaufsliste</h1>
        <ShoppingInput
          setShoppingList={setShoppingList}
          shoppingList={shoppingList}
        />
        <ShoppingList
          setShoppingList={setShoppingList}
          shoppingList={shoppingList}
        />
        <Toaster richColors />
      </div>
    </>
  )
}

export default App
