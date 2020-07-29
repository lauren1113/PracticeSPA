export default () => `
<form id="register" method="POST" action="">
    <div>
      <label for="url">Photo URL:</label>
      <input type="text" name="url" id="url" placeholder="Enter Your Photo URL">
    </div>
    <div>
      <label for="title">Photo Description:</label>
      <input type="text" name="title" id="title" placeholder="Briefly describe your photo">
    </div>
    <input type="submit" name="submit" value="Submit Photo">
  </form>
  `;
