export const getRepo = async (searchInput : string) => {

       if (!searchInput) {
        return { items: [] }; 
      }

      try{
        const response = await fetch(`https://api.github.com/search/repositories?q=${searchInput}&sort=stars&order=desc`)

        if(!response.ok)
        {
           throw new Error(`Something went wrong ${response.status}`);
        }

        const respData = await response.json()

        return respData
      } 
      catch(error){
         console.error("Something went wrong in try block", error)
         throw error;
      }
    }