<?php include 'db.php'; ?>

<!DOCTYPE html>
<html>
<head>
    <title>CRUD App</title>
</head>
<body>

<h2>Add Student</h2>

<form method="POST">
    Name: <input type="text" name="name" required><br><br>
    Email: <input type="email" name="email" required><br><br>
    <button type="submit" name="add">Add</button>
</form>

<?php
if (isset($_POST['add'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];

    $query = "INSERT INTO students (name, email) VALUES ('$name', '$email')";
    mysqli_query($conn, $query);
}
?>

<hr>

<h2>Student List</h2>

<table border="1" cellpadding="10">
<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Actions</th>
</tr>

<?php
$result = mysqli_query($conn, "SELECT * FROM students");

while ($row = mysqli_fetch_assoc($result)) {
    echo "<tr>
        <td>{$row['id']}</td>
        <td>{$row['name']}</td>
        <td>{$row['email']}</td>
        <td>
            <a href='update.php?id={$row['id']}'>Edit</a> |
            <a href='delete.php?id={$row['id']}'>Delete</a>
        </td>
    </tr>";
}
?>

</table>

</body>
</html>