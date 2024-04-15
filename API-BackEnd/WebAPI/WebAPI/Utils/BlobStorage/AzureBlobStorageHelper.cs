using Azure.Storage.Blobs;
using Microsoft.IdentityModel.Tokens;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile arquivo, string stringConexao, string nomeConteiner)
        {
			try
			{
				//verifica se existe o arquivo
				if(arquivo != null)
				{
					//retorna a uri com imagem salva
					var blobName = Guid.NewGuid().ToString().Replace("-","") + Path.GetExtension(arquivo.FileName);

					//cria uma instância do BlobStorageClient passando a string de conexão com o blob Azure
					var blobServiceClient = new BlobServiceClient(stringConexao);


					var blobContainerClient = blobServiceClient.GetBlobContainerClient(nomeConteiner);

					//obtem o blobClient usando blob name
					var blobClient = blobContainerClient.GetBlobClient(blobName);

					//abre o fluxo de entrada de arquivo
					using(var stream = arquivo.OpenReadStream())
					{
						await blobClient.UploadAsync(stream, true);
					}
					//retorna a uri de uma imagem padrão
					return blobClient.Uri.ToString();
				}
				else
				{
					//retorna a uri padrão
					return "https://blobvitalhubg3.blob.core.windows.net/blobvitalhubartur/download.jpg";

                }
			}
			catch (Exception)
			{

				throw;
			}
        }
    }
}
