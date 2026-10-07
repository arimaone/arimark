import { DefineComponent } from 'vue';

export type MetadataFormat = 'frontmatter' | 'bracket';

export interface ArimarkProps {
  /**
   * Raw Markdown document string (supports v-model).
   */
  modelValue?: string;
  /**
   * Placeholder text shown on empty blocks.
   * @default "Type '/' for commands"
   */
  placeholder?: string;
  /**
   * Whether the editor is in read-only mode.
   * @default false
   */
  readonly?: boolean;
  /**
   * Metadata serialization format.
   * - 'frontmatter': Standard YAML Frontmatter (`--- title: ... tags: [...] ---`)
   * - 'bracket': Legacy bracket syntax (`title: [...]`, `tags: [...]`)
   * @default 'frontmatter'
   */
  metadataFormat?: MetadataFormat;
}

export interface ArimarkEmits {
  (e: 'update:modelValue', value: string): void;
  (e: 'save', value: string): void;
  (e: 'title-change', title: string): void;
  (e: 'tags-change', tags: string[]): void;
}

export declare const Arimark: DefineComponent<ArimarkProps, {}, {}, {}, {}, {}, {}, ArimarkEmits>;

export default Arimark;
