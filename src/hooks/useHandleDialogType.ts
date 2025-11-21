import { dialogAtom, DialogType } from "@/atoms/dialogAtom"
import { resetCacheAtom } from "@/atoms/resetCacheAtom"
import { useAtom, useSetAtom } from "jotai"

export const useHandleDialogType = () => {
    const [dialog, setDialog] = useAtom(dialogAtom)
    const resetCache = useSetAtom(resetCacheAtom)

    const handleDialogType = (type: DialogType, action: "add" | "remove", filter?: DialogType[]) => {
        if (action === "add") {
            // If opening login dialog, clear all other dialogs first

            if (type === "addCredit" && dialog.length > 1) {
                resetCache(true);
                setTimeout(() => {
                    setDialog((prev) => Array.from(new Set([...prev.filter(item => item !== type && !filter?.includes(item)), type])))
                }, 100);
            } else {

                setDialog((prev) => Array.from(new Set([...prev.filter(item => item !== type && !filter?.includes(item)), type])))
            }

        } else {

            setDialog((prev) => Array.from(new Set(prev.filter(item => item !== type && !filter?.includes(item)))))
        }
    }

    return { handleDialogType }
}