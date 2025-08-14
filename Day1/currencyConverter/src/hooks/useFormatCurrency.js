import { useCallback, useMemo , useState , useRef} from "react"

export function useFormatCurrency(currencyFormat)
{
    const curre = useMemo(()=>{
        return new Intl.NumberFormat(currencyFormat,
            {
                style : "decimal",
                maximumFractionDigits : 2,
                minimumFractionDigits : 2
            }
        )
    },[currencyFormat])

   const Formatfunc = useCallback((rawValue)=>{
        const updateValue = parseFloat(rawValue)/100
        if(isNaN(updateValue))
        {
            return ""
        }
        else{
            return curre.format(updateValue)
        }
   },[curre])

    return Formatfunc
}