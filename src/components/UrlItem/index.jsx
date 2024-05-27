const UrlItem = ({ url, handleDelete, isDeleting }) => {
  const confirmDelete = () => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      handleDelete(url.token);
    }
  };

  return (
    <div key={url.id} className="url-list__item">
      <p><strong>Original URL:</strong> <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.original_url}</a></p>
      <p><strong>Short URL:</strong> <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{`${process.env.REACT_APP_API_URL}/${url.token}`}</a></p>
      <p><strong>Token:</strong> {url.token}</p>
      <p><strong>Clicks:</strong> {url.clicks}</p>
      <button onClick={confirmDelete} disabled={isDeleting}>Delete</button>
    </div>
  );
};

export default UrlItem;
