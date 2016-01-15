|====================================================================
|                         Test Server                          
|                         -----------                               
|                        |README FILE|                              
|                         -----------                               
|	                        Alex Patel                     
|====================================================================
|                                                                   
|  INTRODUCTORY INFORMATION                                         
|  ------------------------                                       
|                                                                    
| - Program was written and tested in Windows 10          
| - Browser Client was tested in Chrome                                        
| - Ran using CMD with Node                                         
|                                                                   
|                                                                   
|  STARTING THE SERVER                                              
|  -------------------                                              
|                                                                   
| - Open CMD
| - Run "C:\...\mongodb\bin\mongod.exe -dbpath C:\...\Assignment4\mongodb\data\db" on CMD                            
| - Open another CMD from C:\...\Test_Server
| - Run "npm install"
| - Run "app.js"
| - Then, go to your chosen web browser and type: 
|   "http://localhost:3000/index.html"                         
|
| 
|   RUNNING THE APP
|   ---------------
|      
|         Login:
|         ------
|          - URL: "http://localhost:3000/index.html"
|          - You can login with any of the following names and numbers:
|
|            Student Name: stu1 | Student Number: num1
|            Student Name: stu2 | Student Number: num2
|            Student Name: stu3 | Student Number: num3
|            Student Name: stu4 | Student Number: num4
|            Student Name: stu5 | Student Number: num5
|            Student Name: stu6 | Student Number: num6
|            Student Name: stu7 | Student Number: num7
|            Student Name: stu8 | Student Number: num8
|            Student Name: stu9 | Student Number: num9
|            Student Name: prof | Student Number: boss
|
|          - After you have logged in, click on the "start" button to 
|            start the test
|
|         "next" Button:
|         --------------
|          - Goes to the next question 
| 
|         "previous" Button:
|         --------------
|          - Goes to the previous question         	
| 
|         "hint" Button:
|         --------------
|          - Tells the user if the chosen answers is correct or not       	
|               
|   Student Hint Prompting Feature
|   ------------------------------
|    - The enhancement used for part 2 of the assignment is: 
|      student hint prompting
|    - Once the student has selected an answer and if they are unsure 
|      of the chosen answer, the "hint" button can be clicked and 
|      the server will notify the student if the chosen answer is 
|      correct or not 
|    - This is a powerful mechanism and to ensure students don't abuse it,
|      the number of hints the student can receive is limited to 3
|
|   Side Note:
|   ----------
|    - In real life students are not aloud to take exam's multiple times,
|      thus if the student has already taken the exam and its results
|      are stored in the database, the same student can login, but they
|      will be redirected to the finish page
|
===========================================================================
