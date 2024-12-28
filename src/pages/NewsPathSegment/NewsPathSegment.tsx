import { useParams } from 'react-router';

const NewsPathSegment = () => {
  let { segment } = useParams();
  return (
    <div>
      new segment, test useParams {segment}
    </div>
  )
};

export default NewsPathSegment;