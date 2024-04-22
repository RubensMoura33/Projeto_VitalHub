using Microsoft.Azure.CognitiveServices.Vision.ComputerVision;
using Microsoft.Azure.CognitiveServices.Vision.ComputerVision.Models;
using Microsoft.IdentityModel.Tokens;

namespace WebAPI.Utils.OCR
{
    public class OcrService
    {
        private readonly string _subscriptionKey = "";
        private readonly string _endpoint = "";
       
        //Método para reconhecer o caracter(texto) a partir de uma imagem
        public async Task<string> RecognizeTextAsync(Stream imageStream)
        {
            try
            {
                var client = new ComputerVisionClient(new ApiKeyServiceClientCredentials(_subscriptionKey))
                {
                    Endpoint = _endpoint
                };

                //Faz a chamada para API
                var ocrResult = await client.RecognizePrintedTextInStreamAsync(true, imageStream);

                //Processa o resultado e retorna o texto reconhecido
                return ProcessRecognitionResult(ocrResult);
            }
            catch (Exception e)
            {

                return $"Erro ao reconhecer o text {e.Message}";
                
            }
        }

        private static string ProcessRecognitionResult(OcrResult ocrResult)
        {
            string recognizedText = "";

            //Percorre todas as regiões 
            foreach (var region in ocrResult.Regions)
            {
                //Para cada região, percorre as linhas 
                foreach (var line in region.Lines)
                {
                    //Para cada linha, percorre as palavras
                    foreach (var word in line.Words)
                    {
                        //Adiciona cada palavra ao texto, separando com espaço
                        recognizedText += word.Text + " ";
                    }
                    //quebra de linha no final de cada linha
                    recognizedText += "\n";
                }
            }
            //retorna o texto
            return recognizedText;
        }
    }
}
