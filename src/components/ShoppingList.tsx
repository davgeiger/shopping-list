import type { ShoppingItem } from "@/types/shopping"
import { Button } from "./ui/button"
import { CircleCheck, Trash2Icon, Undo2Icon } from "lucide-react"
import type { SetStateAction } from "react"
import { toast } from "sonner"

type ShoppingListProps = {
  shoppingList: ShoppingItem[]
  setShoppingList: React.Dispatch<SetStateAction<ShoppingItem[]>>
}

export default function ShoppingList({
  setShoppingList,
  shoppingList,
}: ShoppingListProps) {
  const toggleDone = (id: string) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    )
  }

  return (
    <>
      {shoppingList.length > 0 ? (
        <div className="mt-4 flex flex-col gap-2">
          {shoppingList.map((item) => (
            <div
              key={item.id}

              className="flex items-center justify-between rounded-md border border-white p-2"
            >
              <div className="flex flex-col">
                <span
                  className={`text-xl font-bold ${item.done ? "text-gray-500 line-through" : ""}`}
                >
                  {item.name}
                </span>
                <span>Anzahl: {item.amount}</span>
              </div>
              {item.done ? (
                <div className="flex items-center">
                  <Button
                    className="bg-red-600 hover:bg-red-500"
                    onClick={() => {
                      toast.success("Produkt gelöscht", {
                        description: `"${item.name}" wurde entfernt.`,
                      })

                      setShoppingList((prev) =>
                        prev.filter(
                          (shoppingItem) => shoppingItem.id !== item.id
                        )
                      )
                    }}
                  >
                    <Trash2Icon />
                  </Button>

                  <Button onClick={() => toggleDone(item.id)}>
                    <Undo2Icon />
                    Zurück
                  </Button>
                </div>
              ) : (
                <Button onClick={() => toggleDone(item.id)}>
                  <CircleCheck />
                  Abhaken
                </Button>
              )}
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  )
}
