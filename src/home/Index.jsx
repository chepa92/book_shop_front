import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { bookService } from '../_services';

function Home({ match }) {
    const { path } = match;
    const [books, setBooks] = useState(null);

    useEffect(() => {
        bookService.getBooks().then(x => setBooks(x));
    }, []);

    function deleteUser(id) {
        setBooks(books.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        bookService.delete(id).then(() => {
            setBooks(books => books.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Books</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Book</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Author</th>
                        <th style={{ width: '30%' }}>Publisher</th>
                        <th style={{ width: '30%' }}>Price</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {books && books.map(user =>
                        <tr key={user.id}>
                            <td>{user.book}</td>
                            <td>{user.author}</td>
                            <td>{user.publisher}</td>
                            <td>{user.price}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${user.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-danger" style={{ width: '60px' }} disabled={user.isDeleting}>
                                    {user.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!books &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <span className="spinner-border spinner-border-lg align-center"></span>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { Home };