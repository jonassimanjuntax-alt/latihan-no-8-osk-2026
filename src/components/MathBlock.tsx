import React, { useMemo } from 'react';
import katex from 'katex';

interface MathDisplayProps {
  tex: string;
  block?: boolean;
  className?: string;
}

export const MathDisplay: React.FC<MathDisplayProps> = ({
  tex,
  block = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(tex, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return tex;
    }
  }, [tex, block]);

  if (block) {
    return (
      <div
        className={`katex-display overflow-x-auto py-1 text-center ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-block align-baseline ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

interface RichMathTextProps {
  text: string;
  className?: string;
}

/**
 * Renders prose containing inline $...$ and block $$...$$ LaTeX fragments via KaTeX.
 */
export const RichMathText: React.FC<RichMathTextProps> = ({
  text,
  className = '',
}) => {
  const segments = useMemo(() => {
    const result: Array<{ type: 'text' | 'inline' | 'block'; content: string }> = [];
    const regex = /(\$\$[\s\S]+?\$\$|\$[^$]+?\$)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        result.push({
          type: 'text',
          content: text.slice(lastIndex, match.index),
        });
      }
      const token = match[0];
      if (token.startsWith('$$') && token.endsWith('$$')) {
        result.push({
          type: 'block',
          content: token.slice(2, -2).trim(),
        });
      } else {
        result.push({
          type: 'inline',
          content: token.slice(1, -1).trim(),
        });
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      result.push({
        type: 'text',
        content: text.slice(lastIndex),
      });
    }
    return result;
  }, [text]);

  const renderFormattedProse = (prose: string) => {
    const boldParts = prose.split(/(\*\*[^*]+?\*\*)/g);
    return boldParts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={idx} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <React.Fragment key={idx}>{part}</React.Fragment>;
    });
  };

  return (
    <span className={className}>
      {segments.map((seg, idx) => {
        if (seg.type === 'block') {
          return <MathDisplay key={idx} tex={seg.content} block />;
        }
        if (seg.type === 'inline') {
          return <MathDisplay key={idx} tex={seg.content} />;
        }
        return <React.Fragment key={idx}>{renderFormattedProse(seg.content)}</React.Fragment>;
      })}
    </span>
  );
};
