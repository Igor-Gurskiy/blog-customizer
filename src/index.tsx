import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

import { App } from 'src/components/app/App';

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
