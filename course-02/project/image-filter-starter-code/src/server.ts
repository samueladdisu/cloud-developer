import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
  image_url: string;
}

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  // app.get( "/filteredimage", async ( req: Request, res: Response ) => {
  //   const image_url: string = req.query.image_url;
  //   if(!image_url) { // just check if image_url exist and has value
  //     return res.status(404).send("You need to send a public image_url valid!");
  //   }
  //   let fileImage: string;
  //   try {   
  //     fileImage = await filterImageFromURL(image_url);
  //     res.sendFile(fileImage, ()=> {deleteLocalFiles([fileImage])});
  //   } catch (e) {
  //     res.status(422).send(e);
  //   }
  // });
  // <RequestParams, ResponseBody, RequestBody, RequestQuery>

  app.get("/filteredimage",async ( req: Request <RequestParams, ResponseBody, RequestBody, RequestQuery>, res: Response ) =>{

    const { image_url } = req.query

    
    if(image_url == '' || !image_url){
      return res.status(400).json({message: "Link is not valid"})
    }else{
      filterImageFromURL(image_url).then((result)=>{
        res.status(200).sendFile(result, ()=>{
          deleteLocalFiles([result])
        })
      }).catch((err)=>{
          res.status(400).json({message: "error filtering"+ err +""})
      })
    }


  })

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();