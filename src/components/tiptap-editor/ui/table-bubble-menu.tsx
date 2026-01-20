import { BubbleMenu } from "@tiptap/react/menus";
import {
  ArrowDownToLine,
  ArrowLeftToLine,
  ArrowRightToLine,
  ArrowUpToLine,
  Columns,
  Rows,
  Table as TableIcon,
  Trash2,
} from "lucide-react";
import type { Editor } from "@tiptap/react";
import type React from "react";

interface TableBubbleMenuProps {
  editor: Editor | null;
}

export const TableBubbleMenu: React.FC<TableBubbleMenuProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="tableBubbleMenu"
      shouldShow={({ editor: currentEditor }: { editor: Editor }) =>
        currentEditor.isActive("table")
      }
      options={{ placement: "top", offset: 8 }}
      className="flex items-center p-1 rounded-sm border border-border/60 bg-background/95 backdrop-blur-sm shadow-sm gap-0.5"
    >
      {/* Column Operations */}
      <div className="flex items-center gap-0.5 mr-2">
        <button
          onClick={() => editor.chain().focus().addColumnBefore().run()}
          className="p-1.5 text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-sm transition-all"
          title="左侧插列"
        >
          <ArrowLeftToLine size={13} />
        </button>
        <button
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className="p-1.5 text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-sm transition-all"
          title="右侧插列"
        >
          <ArrowRightToLine size={13} />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteColumn().run()}
          className="p-1.5 text-muted-foreground/70 hover:text-red-500 hover:bg-red-500/10 rounded-sm transition-all"
          title="删除列"
        >
          <Columns size={13} />
        </button>
      </div>

      {/* Row Operations */}
      <div className="flex items-center gap-0.5 mr-2">
        <button
          onClick={() => editor.chain().focus().addRowBefore().run()}
          className="p-1.5 text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-sm transition-all"
          title="上方插行"
        >
          <ArrowUpToLine size={13} />
        </button>
        <button
          onClick={() => editor.chain().focus().addRowAfter().run()}
          className="p-1.5 text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-sm transition-all"
          title="下方插行"
        >
          <ArrowDownToLine size={13} />
        </button>
        <button
          onClick={() => editor.chain().focus().deleteRow().run()}
          className="p-1.5 text-muted-foreground/70 hover:text-red-500 hover:bg-red-500/10 rounded-sm transition-all"
          title="删除行"
        >
          <Rows size={13} />
        </button>
      </div>

      {/* Header Toggles */}
      <div className="flex items-center gap-0.5 mr-2">
        <button
          onClick={() => editor.chain().focus().toggleHeaderColumn().run()}
          className={`p-1.5 rounded-sm transition-all ${
            editor.isActive("tableHeader")
              ? "text-foreground bg-muted font-medium"
              : "text-muted-foreground/70 hover:text-foreground hover:bg-muted/50"
          }`}
          title="表头列"
        >
          <TableIcon size={13} className="rotate-90" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeaderRow().run()}
          className={`p-1.5 rounded-sm transition-all ${
            editor.can().toggleHeaderRow()
              ? "text-muted-foreground/70 hover:text-foreground hover:bg-muted/50"
              : "opacity-30 cursor-not-allowed"
          }`}
          title="表头行"
        >
          <TableIcon size={13} />
        </button>
      </div>

      {/* Delete Table */}
      <button
        onClick={() => {
          if (confirm("删除表格？")) {
            editor.chain().focus().deleteTable().run();
          }
        }}
        className="p-1.5 text-muted-foreground/70 hover:text-red-500 hover:bg-red-500/10 rounded-sm transition-all ml-auto"
        title="删除表格"
      >
        <Trash2 size={13} />
      </button>
    </BubbleMenu>
  );
};
