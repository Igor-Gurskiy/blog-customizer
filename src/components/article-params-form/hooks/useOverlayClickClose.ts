import { useEffect } from 'react';

type UseOverlayClickClose = {
	isOpen: boolean;
	sidebarRef: React.RefObject<HTMLDivElement>;
	onChange: (newValue: boolean) => void;
};
export const useOverlayClickClose = ({
	isOpen,
	sidebarRef,
	onChange,
}: UseOverlayClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !sidebarRef.current?.contains(target)) {
				isOpen && onChange?.(false);
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen]);
};
