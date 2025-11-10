import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'

// Initialize lowlight with all languages
const lowlight = createLowlight()
lowlight.register(all)  

const CodeBlockLowlight = CodeBlockLowlight.configure({ lowlight });

export default CodeBlockLowlight;