import React from 'react';
import { ChecklistLine } from './checklist-line';
import { Note } from './note';

export function RenderChecklist({ checklist }: { checklist: string }) {
  const parseChecklist = (s: string) => {
    const regSplit = /(\n|\[\w+\].*?\[\/\w+\])/g;
    const regReplace = /\[(\w+)\](.*?)\[\/\w+\]/;

    const parts = s.split(regSplit);

    const result = parts.map((part) => {
      if (part === '\n') return <br />;

      const match = part.match(regReplace);
      if (match) {
        const type = match[1];
        const content = match[2];

        switch (type) {
          case 'u':
            return <u>{content}</u>;
          case 'b':
            return <strong>{content}</strong>;
          case 'goto':
            return <strong>&#9658;&#9658; {content}</strong>;
          case 'note':
            return <Note type="Note" content={content} />;
          case 'caution':
            return <Note type="Caution" content={content} />;
          case 'warning':
            return <Note type="Warning" content={content} />;
          case 'check':
            const [left, right] = content.split('<TAB>');
            return <ChecklistLine left={left} right={right} />;
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
    <>
      {parseChecklist(checklist).map((a, idx) => (
        <React.Fragment key={idx}>{a}</React.Fragment>
      ))}
    </>
  );
}
