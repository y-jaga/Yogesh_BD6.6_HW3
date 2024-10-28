const request = require('supertest');
const http = require('http');

const { app } = require('../index');
const { getAllBooks } = require('../controllers/index');

jest.mock('../controllers/index', () => ({
  ...jest.requireActual('../controllers/index'),
  getAllBooks: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Controller Function Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //Exercise 5: Mock the Get All Books Function
  it('should return all books', () => {
    let mockedBooks = [
      {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
      {
        bookId: 2,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
      },
      {
        bookId: 3,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Classic',
      },
    ];

    getAllBooks.mockReturnValue(mockedBooks);
    const result = getAllBooks();
    expect(result).toEqual(mockedBooks);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints Tests', () => {
  //Exercise 3: Test Retrieve All Books
  it('GET API /books endpoint retrieves all books.', async () => {
    const res = await request(server).get('/books');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      books: [
        {
          bookId: 1,
          title: 'To Kill a Mockingbird',
          author: 'Harper Lee',
          genre: 'Fiction',
        },
        {
          bookId: 2,
          title: '1984',
          author: 'George Orwell',
          genre: 'Dystopian',
        },
        {
          bookId: 3,
          title: 'The Great Gatsby',
          author: 'F. Scott Fitzgerald',
          genre: 'Classic',
        },
      ],
    });
    expect(res.body.books.length).toBe(3);
  });

  //Exercise 4: Test Retrieve Book by ID
  it('GET API /books/details/:id endpoint retrieves a book by id.', async () => {
    const res = await request(server).get('/books/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      book: {
        bookId: 1,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
      },
    });
  });
});
