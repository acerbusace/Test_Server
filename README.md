|==================================================================== <br />
|                         Test Server <br />                         
|                         ----------- <br />                              
|                        |README FILE| <br />                             
|                         ----------- <br />                              
|	                        Alex Patel <br />                    
|==================================================================== <br />
| <br />                                                                   
|  INTRODUCTORY INFORMATION <br />                                         
|  ------------------------ <br />                                       
| <br />                                                                    
| - Program was written and tested in Windows 10 <br />          
| - Browser Client was tested in Chrome <br />                                        
| - Ran using CMD with Node <br />                                         
| <br />                                                                   
| <br />                                                                   
|  STARTING THE SERVER <br />                                              
|  ------------------- <br />                                              
| <br />                                                                   
| - Open CMD <br />
| - Run "C:\...\mongodb\bin\mongod.exe -dbpath C:\...\Test_Server\mongodb\data\db" on CMD <br />                            
| - Open another CMD from C:\...\Test_Server <br />
| - Run "npm install" <br />
| - Run "app.js" <br />
| - Then, go to your chosen web browser and type: <br /> 
|   "http://localhost:3000/index.html" <br />                         
| <br />
| <br /> 
|   RUNNING THE APP <br />
|   --------------- <br />
| <br />      
|         Login: <br />
|         ------ <br />
|          - URL: "http://localhost:3000/index.html" <br />
|          - You can login with any of the following names and numbers: <br />
| <br />
|            Student Name: stu1 | Student Number: num1 <br />
|            Student Name: stu2 | Student Number: num2 <br />
|            Student Name: stu3 | Student Number: num3 <br />
|            Student Name: stu4 | Student Number: num4 <br />
|            Student Name: stu5 | Student Number: num5 <br />
|            Student Name: stu6 | Student Number: num6 <br />
|            Student Name: stu7 | Student Number: num7 <br />
|            Student Name: stu8 | Student Number: num8 <br />
|            Student Name: stu9 | Student Number: num9 <br />
|            Student Name: prof | Student Number: boss <br />
| <br />
|          - After you have logged in, click on the "start" button to <br /> 
|            start the test <br />
| <br />
|         "next" Button: <br />
|         -------------- <br />
|          - Goes to the next question <br /> 
| <br /> 
|         "previous" Button: <br />
|         -------------- <br />
|          - Goes to the previous question <br />         	
| <br /> 
|         "hint" Button: <br />
|         -------------- <br />
|          - Tells the user if the chosen answers is correct or not <br />       	
| <br />               
|   Student Hint Prompting Feature <br />
|   ------------------------------ <br />
|    - The enhancement used for part 2 of the assignment is: <br /> 
|      student hint prompting <br />
|    - Once the student has selected an answer and if they are unsure <br /> 
|      of the chosen answer, the "hint" button can be clicked and <br /> 
|      the server will notify the student if the chosen answer is <br /> 
|      correct or not <br /> 
|    - This is a powerful mechanism and to ensure students don't abuse it, <br />
|      the number of hints the student can receive is limited to 3 <br />
| <br />
|   Side Note: <br />
|   ---------- <br />
|    - In real life students are not aloud to take exam's multiple times, <br />
|      thus if the student has already taken the exam and its results <br />
|      are stored in the database, the same student can login, but they <br />
|      will be redirected to the finish page <br />
| <br />
=========================================================================== <br />
