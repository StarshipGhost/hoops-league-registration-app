import { useEffect, type RefObject } from "react";

export function useOutsideClick (ref: RefObject<HTMLElement | null>, open : boolean, handler: () => void) {
    useEffect(() => {
        const nodeRef = ref.current 
        function handleOutsideClick (event: Event)  {
            if (open && nodeRef && !nodeRef.contains(event.target as Node)) {
                handler();
            } 
        }
        window.addEventListener('click', handleOutsideClick);
        return () => {
            window.removeEventListener('click', handleOutsideClick);
        }
    }, [ref, open, handler])
}