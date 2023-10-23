from flask import Flask, request, jsonify
import psycopg2
from flask_cors import CORS
import math


app = Flask(__name__)
CORS(app)

try:
    conn = psycopg2.connect(
        database="flower_list", 
        user="postgres", 
        password="qwerty", 
        host="localhost", 
        port="5432"
    )

    with conn.cursor() as cur:
        cur.execute('''
            CREATE TABLE IF NOT EXISTS flower_list (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                price NUMERIC(5,2) NOT NULL,
                size VARCHAR(50) NOT NULL,
                category VARCHAR(50) NOT NULL,
                discount VARCHAR(50) NOT NULL,
                url VARCHAR(255) NOT NULL,
                date DATE NOT NULL
            )
        ''')
        conn.commit()

except Exception as e:
    print(f"error: {e}")
    conn = None

@app.route('/list', methods = ['GET'])
def get_list():
    try:
        with conn.cursor() as cur:
            cur.execute('SELECT * FROM flower_list')
            data = cur.fetchall()
        
        flower_list = [{'id': row[0],
                        'name': row[1],
                        'price': row[2],
                        'size': row[3],
                        'category': row[4],
                        'discount': row[5],
                        'url': row[6],
                        'date': row[7] 
                           } for row in data]
        return jsonify(flower_list)
    except Exception as e:
        print(e)
        return jsonify({'message': 'Error occurred while getting data in flower-List'}), 500

@app.route('/list', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        for item in data:
            name = item.get('name')
            price = item.get('price')
            size = item.get('size')
            category = item.get('category')
            discount = item.get('discount')
            url = item.get('url')
            date = item.get('date')

            if not name or not price or not size or not category or not discount or not date:
                return jsonify({'message': 'Data maybe empty and is required'}), 400

            with conn.cursor() as cur:
                cur.execute('''INSERT INTO flower_list (name, price, size, category, discount, url, date) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s) 
                            RETURNING name, price, size, category, discount, url, date''', 
                            (name, price, size, category, discount, url, date))
                conn.commit()

        return jsonify({'message': 'List created'}), 201
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'message': 'An error occurred while creating user'}), 500
  
@app.route('/list/<parameter>', methods = ['GET'])
def getDistinct(parameter: str):
    try:
        with conn.cursor() as cur:
            cur.execute(f'''
                            SELECT DISTINCT({parameter}) FROM flower_list
                        ''')
            data = cur.fetchall()
        return jsonify(data)
    except Exception as e:
        print(e)
        return jsonify({'message': f'Internal Showing Distinct{parameter}'}), 500


@app.route('/list/<parameter>/<parName>', methods = ['GET'])
def countParameter(parameter: str, parName: str):
    try:
        with conn.cursor() as cur:
            cur.execute(f'''
                            SELECT COUNT({parameter}) FROM flower_list
                            WHERE {parameter} = %s
                        ''', (parName,))
            data = cur.fetchone()
        return jsonify(data)
    except Exception as e:
        print(e)
        return jsonify({'message': f'Internal Counting {parameter}'}), 500


@app.route('/filter', methods=['GET'])
def filterData():
    try:
        isDiscount = request.args.get('isDiscount', False)
        isNew = request.args.get('isNew', False)
        minPrice = request.args.get('minPrice', 0)
        maxPrice = request.args.get('maxPrice')
        category = request.args.get('category')
        size = request.args.get('size')
        limit = request.args.get('limit', 9)  
        offset = request.args.get('offset', 0)
        sort = request.args.get('sort', 'default')
        searchTerm = request.args.get('searchterm', '') 
        
        with conn.cursor() as cur:
            query = 'SELECT name, price, discount FROM flower_list'
            conditions = []
            values = []

            if isDiscount:
                conditions.append("(CAST(REPLACE(discount, %s, %s) AS INT)) > 0")
                values.extend(['%', '']) 
            if isNew:
                conditions.append("date > %s")
                values.append('2023-10-01')
            if minPrice is not None:
                conditions.append("price >= %s")
                values.append(minPrice)
            if maxPrice is not None:
                conditions.append("price <= %s")
                values.append(maxPrice)
            if category:
                conditions.append("category = %s")
                values.append(category) 
            if size:
                conditions.append("size = %s")
                values.append(size)  # Add search term with wildcards
            if conditions:
                query += ' WHERE ' + ' AND '.join(conditions)

            if sort.lower() == 'cheap':
                query += ' ORDER BY price ASC'
            elif sort.lower() == 'expensive':
                query += ' ORDER BY price DESC'
            elif sort.lower() == 'new':
                query += ' ORDER BY date ASC'
            elif sort.lower() == 'old':
                query += ' ORDER BY date DESC'
            elif sort.lower() == 'default':
                query += ' ORDER BY id DESC'

            query += ' LIMIT %s OFFSET %s'
            values.extend([limit, offset])

            cur.execute(query, tuple(values))
            data = cur.fetchall()
             
            if data:
                result = [{'name': row[0], 'price': row[1], 'discount': row[2]} for row in data]
                return jsonify(result)
            
            else:
                return jsonify({'message': 'No Match'})

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500

@app.route('/filterlength', methods=['GET'])
def filterLength():
    try:
        try:
            isDiscount = request.args.get('isDiscount', False)
            isNew = request.args.get('isNew', False)
            minPrice = request.args.get('minPrice')
            maxPrice = request.args.get('maxPrice')
            category = request.args.get('category')
            size = request.args.get('size')
            limit = int(request.args.get('limit', 9))  # Default to 9 if not provided

        except Exception as e:
            print(f"Error retrieving parameters: {e}")
            return jsonify({'message': 'Error retrieving parameters'}), 400 

        with conn.cursor() as cur:
            query = 'SELECT COUNT(*) FROM flower_list'
            conditions = []
            values = []

            if isDiscount:
                conditions.append("(CAST(REPLACE(discount, %s, %s) AS INT)) > 0")
                values.extend(['%', '']) 
            if isNew:
                conditions.append("date > %s")
                values.append('2023-10-01')
            if minPrice is not None:
                conditions.append("price >= %s")
                values.append(minPrice)
            if maxPrice is not None:
                conditions.append("price <= %s")
                values.append(maxPrice)
            if category:
                conditions.append("category = %s")
                values.append(category)
            if size:
                conditions.append("size = %s")
                values.append(size)
            
            if conditions:
                query += ' WHERE ' + ' AND '.join(conditions)

            cur.execute(query, tuple(values))
            total_items = cur.fetchone()[0]

            if total_items:
                max_page = math.ceil(total_items / limit)
                return jsonify({'max_page': max_page, 'results': total_items})
            else:
                return jsonify({'message': 'No Match'})

    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500

@app.route('/search', methods=['GET'])
def searchItem():
    try:
        searchTerm = request.args.get('searchTerm', '')
        if searchTerm =='':
            return jsonify({'message': 'searchTerm is empty'})

        with conn.cursor() as cur:
            query = '''SELECT name, price, discount FROM flower_list WHERE
                    LOWER(name) LIKE %s'''
            
            cur.execute(query, ('%' + searchTerm.lower() + '%',))
            data = cur.fetchall()

            if data:
                result = [{'name': row[0], 'price': row[1], 'discount': row[2]} for row in data]
                return jsonify(result)
            else:
                return jsonify({'message': 'No Match'})
            
    except Exception as e:
        print(e)
        return jsonify({'message': 'Internal Server Error'}), 500



if __name__ == '__main__':
    app.run(debug=True)


