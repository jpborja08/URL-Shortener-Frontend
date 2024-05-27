import UrlItem from '@components/UrlItem';

const UrlList = ({ urls, handleDelete }) => (
  <div className="url-list">
    {urls && urls.urls.map((url) => (
      <UrlItem key={url.id} url={url} handleDelete={handleDelete} />
    ))}
  </div>
);

export default UrlList;
