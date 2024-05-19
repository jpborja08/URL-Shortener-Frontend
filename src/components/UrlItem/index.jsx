const UrlItem = ({ url, handleDelete, isDeleting }) => (
  <div key={url.id} className="url-list__item">
    <p><strong>Original URL:</strong> <a href={url.original_url} target="_blank" rel="noopener noreferrer">{url.original_url}</a></p>
    <p><strong>Short URL:</strong> <a href={`${process.env.REACT_APP_API_URL}/${url.token}`} target="_blank" rel="noopener noreferrer">{`${process.env.REACT_APP_API_URL}/${url.token}`}</a></p>
    <p><strong>Token:</strong> {url.token}</p>
    <p><strong>Clicks:</strong> {url.clicks}</p>
    <button onClick={() => handleDelete(url.token)} disabled={isDeleting}>Delete</button>
  </div>
);

export default UrlItem;
