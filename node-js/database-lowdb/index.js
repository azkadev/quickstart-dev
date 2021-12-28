
var { join, dirname } = require("path");
var { Low, JSONFile } = require("lowdb");
// Use JSON file for storage
var file = join(__dirname, 'db.json')
var adapter = new JSONFile(file)
var db = new Low(adapter)

async function main() {
    // Read data from JSON file, this will set db.data content
    await db.read()

    // If file.json doesn't exist, db.data will be null
    // Set default data
    db.data ||= { posts: [] }
    // db.data = db.data || { posts: [] } // for node < v15.x

    // Create and query items using plain JS
    db.data.posts.push('hello world')
    db.data.posts[0]

    // You can also use this syntax if you prefer
    const { posts } = db.data
    posts.push('hello world')

    // Write db.data content to db.json
    await db.write()
}

main();