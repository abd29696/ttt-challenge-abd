# ttt-challenge-abd
TTT Challenge Application (Built with Reactjs, Express and Nodejs)

The application has been hosted on heroku and can be accessed here -> https://ttt-challenge-client.herokuapp.com/

This application contains two parts, 'ttt_client' and 'ttt_server'.

- /ttt/ttt_client/public/ contains 'index.html'. Here div id="root" is present. All the magic happens inside this.

- /ttt/ttt_client/src/ contains all the customization done to this application. 

  - index.js
  
    - Under Component App
       - Under the method render(), a basic wireframe has been defined. The main container is divided into two parts using the col-md-6 of bootstrap. The left side of the container contains a smaller div, in which you can enter the value for 'N' and then click the submit button to process the Top N most frequently occuring words. After processing, the values would come on the right hand side in a tabular form.
      - Under the event handleChange(), Everytime you enter a value for n in the textbox, the value is stored in the state as number.
      - Under the event handleClick(), When the submit button is clicked, the value stored in the state for number is taken. Then a POST call occurs to the server with number as the body. Once the call is successful, it returns a response with the top n words. An object 'topNData' containing an empty array tableValues is defined. The words with their count is iterated and pushed inside the array in the required format. This is again stored in the state as topNdata. topNdata is then passed to another component called TopNGrid.
     - Under Component TopNGrid
       - The value passed is recieved and again sent to another component called Demo which is present inside gridTopN.js.
       
   - gridTopN.js
   
     - Under export default class Demo
        - DevExtreme React Grid is used for displaying the output in tabular format. DevExtreme provides HTML5 Javascript widgets that can easily be integrated with the UI.
        - Following the basic React Grid format, the data has been passed to be displayed.
        - componentWillReceiveProps() is used as the state is being changed and to avoid re-rendering. Once the data is recieved it is stored in the state as rows. They are then passed as rows and columns to the grid.
        
    - App.css
    
      - All the styling done to the basic wireframe is present here.
      
      
- /ttt/ttt_server/bin contains 'www'. Here the port settings are defined.

- /ttt/ttt_server contains app.js. Everything that the server requires resides here.

- /ttt/ttt_server/routes/ contains all the routes in the server. 

  - logicapi.js
  
    - This contains the logic behind finding out the top N words. It first sends a get request to https://terriblytinytales.com/test.txt and stores the body as ttt_text. Then characters like '.', '?', '/n' are replaced with a blank space. Then we split with the blank space and the words are stored in a an array called wordArray. An object called frequency is created which would contain the map of words and it's frequencies. A for each loop is run on the wordArray, words with it's frequency is stored in the frequency object.
    - app.post('/topn'): when this url is hit, a result object is created. The value for n is taken and stored. Next we take the value of every word's frequency and sort it in desc order. Once sorted we slice i.e. take the first n value from the sorted array and store it in the resultHash object which would finally contain the top n most occuring words. The resultHash is then sent as response as a JSON object.   

  
