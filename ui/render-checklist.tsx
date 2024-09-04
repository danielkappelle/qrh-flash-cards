import { Note } from './note';

export function RenderChecklist({ checklist }: { checklist: string }) {
  const parseBlock = (s: string) => {
    if (!s.length) {
      return [<br />];
    }

    const regSplit = /(\[\w+\].*?\[\/\w+\])/g;
    const regReplace = /\[(\w+)\](.*?)\[\/\w+\]/;

    const parts = s.split(regSplit);

    const result = parts.map((part) => {
      const match = part.match(regReplace);
      if (match) {
        const type = match[1];
        const content = match[2];

        switch (type) {
          case 'u':
            return <u>{content}</u>;
          case 'note':
            return <Note type="Note" content={content} />;
          default:
            return content;
        }
      } else {
        return part;
      }
    });

    return [...result, <br />];
  };

  return (
    <>{checklist.split('\n').map((cl, idx) => parseBlock(cl).map((a) => a))}</>
  );
}
