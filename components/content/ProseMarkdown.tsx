import ReactMarkdown from "react-markdown";

export function ProseMarkdown({ content }: { content: string }) {
  return (
    <div className="prose-portfolio max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
