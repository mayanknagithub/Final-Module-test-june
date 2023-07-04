const students = [
    { ID: 1, name: 'Alice', age: 21, grade: 'A', degree: 'Btech', email: 'alice@example.com' },
    { ID: 2, name: 'Bob', age: 22, grade: 'B', degree: 'MBA', email: 'bob@example.com' },
    { ID: 3, name: 'Charlie', age: 20, grade: 'C', degree:'Arts', email: 'charlie@example.com' }
  ];
  
  const studentTable = document.getElementById('student-table');
  const formContainer = document.getElementById('form-container');
  const studentForm = document.getElementById('student-form');
  const cancelButton = document.getElementById('cancel-button');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  
  let isEditMode = false;
  let editStudentId = null;
  
  function renderStudents() {
    studentTable.innerHTML = '';
  
    students.forEach((student) => {
      const row = document.createElement('div');
      row.classList.add('student-row');
  
      row.innerHTML = `
        <div>${student.ID}</div>
        <div>${student.name}</div>
        <div>${student.age}</div>
        <div>${student.grade}</div>
        <div>${student.degree}</div>
        <div>${student.email}</div>
        <div>
          <button class="edit-button" data-id="${student.ID}">Edit</button>
          <button class="delete-button" data-id="${student.ID}">Delete</button>
        </div>
      `;
  
      studentTable.appendChild(row);
    });
  }
  
  function showForm() {
    formContainer.style.display = 'block';
  }
  
  function hideForm() {
    formContainer.style.display = 'none';
    resetForm();
  }
  
  function resetForm() {
    studentForm.reset();
    isEditMode = false;
    editStudentId = null;
    document.getElementById('submit-button').textContent = 'Add Student';
  }
  
  function populateForm(student) {
    document.getElementById('student-id').value = student.ID;
    document.getElementById('name').value = student.name;
    document.getElementById('age').value = student.age;
    document.getElementById('grade').value = student.grade;
    document.getElementById('degree').value = student.degree;
    document.getElementById('email').value = student.email;
  }
  
  function addStudent(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    const degree = document.getElementById('degree').value;
    const email = document.getElementById('email').value;
  
    if (isEditMode && editStudentId) {
      const index = students.findIndex((student) => student.ID === editStudentId);
      if (index !== -1) {
        students[index] = { ID: editStudentId, name, age, grade, degree, email };
        renderStudents();
        hideForm();
      }
    } else {
      const newStudentId = students.length > 0 ? students[students.length - 1].ID + 1 : 1;
      const newStudent = { ID: newStudentId, name, age, grade, degree, email };
      students.push(newStudent);
      renderStudents();
      hideForm();
    }
  }
  
  function deleteStudent(event) {
    const button = event.target;
    const studentId = button.getAttribute('data-id');
    const index = students.findIndex((student) => student.ID === parseInt(studentId));
  
    if (index !== -1) {
      students.splice(index, 1);
      renderStudents();
    }
  }
  
  function editStudent(event) {
    const button = event.target;
    const studentId = button.getAttribute('data-id');
    const student = students.find((student) => student.ID === parseInt(studentId));
  
    if (student) {
      isEditMode = true;
      editStudentId = student.ID;
      populateForm(student);
      document.getElementById('submit-button').textContent = 'Edit Student';
      showForm();
    }
  }
  
  function searchStudents() {
    const searchTerm = searchInput.value.toLowerCase();
  
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm) ||
      student.email.toLowerCase().includes(searchTerm) ||
      student.degree.toLowerCase().includes(searchTerm)
    );
  
    studentTable.innerHTML = '';
  
    filteredStudents.forEach((student) => {
      const row = document.createElement('div');
      row.classList.add('student-row');
  
      row.innerHTML = `
        <div>${student.ID}</div>
        <div>${student.name}</div>
        <div>${student.age}</div>
        <div>${student.grade}</div>
        <div>${student.degree}</div>
        <div>${student.email}</div>
        <div>
          <button class="edit-button" data-id="${student.ID}">Edit</button>
          <button class="delete-button" data-id="${student.ID}">Delete</button>
        </div>
      `;
  
      studentTable.appendChild(row);
    });
  }
  
  // Event listeners
  studentForm.addEventListener('submit', addStudent);
  cancelButton.addEventListener('click', hideForm);
  searchButton.addEventListener('click', searchStudents);
  studentTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
      deleteStudent(event);
    } else if (event.target.classList.contains('edit-button')) {
      editStudent(event);
    }
  });
  
  // Initial rendering
  renderStudents();
  