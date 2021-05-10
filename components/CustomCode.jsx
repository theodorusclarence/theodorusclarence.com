export function Pre(props) {
  return (
    <pre {...props}>
      {props.children}
      <style jsx>{`
        pre {
          position: relative;
          padding-top: 2.5rem;
        }
      `}</style>
    </pre>
  );
}

export default function CustomCode(props) {
  const language = props.className?.includes('language')
    ? props.className.replace('language-', '')
    : null;
  return (
    <code {...props}>
      {props.children}
      {/* {language && (
            )} */}
      <div className='absolute top-0 px-3 py-1 border-t-0 rounded-b-md border-thin left-6'>
        <span className='font-medium select-none accent'>
          {language || 'code'}
        </span>
      </div>
    </code>
  );
}
