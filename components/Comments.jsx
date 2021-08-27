import { useUtterances } from '@/hooks/useUtterances';
import { classNames } from '@/utils/helper';

const commentNodeId = 'comments';

export default function Comments(props) {
  useUtterances(commentNodeId);
  return (
    <div
      {...props}
      className={classNames('md:min-h-[269px] min-h-[273px]', props.className)}
      id={commentNodeId}
    />
  );
}
