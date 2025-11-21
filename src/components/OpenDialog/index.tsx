"use client";
import { DialogType } from "@/atoms/dialogAtom";
import { useHandleDialogType } from "@/hooks/useHandleDialogType";
import { useEffect } from "react";

export const OpenDialog = ({ type }: { type: DialogType }) => {

    const { handleDialogType } = useHandleDialogType();

    useEffect(() => {
        if (type) {
            handleDialogType(type, "add");
        }
    }, [type]);
  return null;
}

export default OpenDialog;