import { useEffect } from 'react';

type UseOutsideClickClose = {
	rootRef: React.RefObject<HTMLDivElement>;
	onClose: () => void;
};

export const useOutsideClickClose = ({
	rootRef,
	onClose,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (rootRef.current && !rootRef.current?.contains(e.target as Node)) {
				onClose();
			}
		};
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [rootRef, onClose]);
};
