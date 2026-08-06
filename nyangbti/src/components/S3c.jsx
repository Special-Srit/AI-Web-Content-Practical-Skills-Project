import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useEffect, useState } from "react"

export function S3c({ open, defaultName, error, onOpenChange, onSave }) {
  const [name, setName] = useState(defaultName)
  useEffect(() => setName(defaultName), [defaultName])
  return <Drawer open={open} onOpenChange={onOpenChange}><DrawerContent>
    <DrawerHeader className="flex flex-row items-start justify-between"><DrawerTitle>이 고양이의 이름</DrawerTitle><DrawerClose asChild><Button type="button" variant="secondary" size="icon" aria-label="닫기"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-100"><X size={21} strokeWidth={1.75} /></span></Button></DrawerClose></DrawerHeader>
    <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-[calc(16px+env(safe-area-inset-bottom))]">
      <label htmlFor="save-cat-name" className="sr-only">고양이 이름</label><Input id="save-cat-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="예: 나비" autoFocus />
      <DrawerDescription className="mt-4 leading-6">이 기기에만 저장됩니다 · 브라우저 데이터를 지우면 복구할 수 없습니다.</DrawerDescription>
      {error && <p role="alert" className="mt-3 text-sm leading-6 text-red-700">{error}</p>}
      <Button type="button" className="mt-6 w-full" disabled={!name.trim()} onClick={() => onSave(name.trim())}>저장</Button>
    </div>
  </DrawerContent></Drawer>
}
