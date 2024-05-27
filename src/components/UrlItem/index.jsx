const UrlItem = ({ url, handleDelete, isDeleting }) => {
  const confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      handleDelete(url.token);
    }
  };

  return (
    <div key={url.id} className="url-list__item">
      <p><strong>Original URL:</strong> <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a></p>
      <p><strong>Short URL:</strong> <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></p>
      <p><strong>Token:</strong> {url.token}</p>
      <p><strong>Clicks:</strong> {url.clicks}</p>
      <button onClick={confirmDelete} disabled={isDeleting}>Delete</button>
    </div>
  );
};

export default UrlItem;
