"use client"
import styles from './index.module.css';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha,styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import { purple,yellow,green,blue } from '@mui/material/colors';
import { NextApiResponse } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Home() {

  

  const [value1, setValue1] = React.useState<number>(1);
  const [value2, setValue2] = React.useState<number>(0);
  const [QTDlockpick, setQTDlockpick] = React.useState<number>(0);
  const [QTDflipper, setQTDflipper] = React.useState<number>(0);
  const [QTDkit, setQTDkit] = React.useState<number>(0);
  const [QTDchave, setQTDchave] = React.useState<number>(0);
  const [QTDalicate, setQTDalicate] = React.useState<number>(0);
  const [QTDoleo, setQTDoleo] = React.useState<number>(0);
  const [QTDpneu, setQTDpneu] = React.useState<number>(0);
  const [QTDbateria, setQTDbateria] = React.useState<number>(0);
  const [ReparoFora, setReparoFora] = React.useState<number>(0);
  const [QTDkm, setQTDkm] = React.useState<number>(0);
  const [QTDcinto, setQTDcinto] = React.useState<number>(0);
  const [QTDdesconto, setQTDdesconto] = React.useState<number>(1);
  const [desgastado, setDesgastado] = React.useState<number>(1);
  const [apenasReparo, setApenasReparo] = React.useState(true);

  React.useEffect(() => {
    setPeçaD(calculatePeçaD(desgastado));
    setPeçaC(calculatePeçaC(desgastado));
  }, [desgastado]);

  const calculatePeçaD = (desgastado: number) => {
    return desgastado === 1 ? 900 : 1500;
  };

  const calculatePeçaC = (desgastado: number) => {
    // Adjust the calculation logic for other menu items as needed
    return desgastado === 1 ? 1100 : 1700;
  };


  const [peçaD, setPeçaD] = React.useState<number>(calculatePeçaD(desgastado));
  const [peçaC, setPeçaC] = React.useState<number>(calculatePeçaC(desgastado));
  
  //const [result, setResult] = React.useState<number>(0);

  const isFormValid = () => {
    return (
      formData.custumizador &&
      formData.valorMaoDeObra &&
      formData.result
    );
  };
 

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
  
    // Verifica se o campo deve ser tratado como número
    const updatedValue = ['tipo', 'quantidade', 'result', 'QTDlockpick', 'QTDflipper', 'QTDkit', 'QTDkm', 'QTDalicate', 'QTDbateria','QTDoleo','ReparoFora','QTDchave'].includes(name)
      ? parseFloat(value)
      : value;
  
    setFormData((prevData) => ({ ...prevData, [name]: updatedValue }));
  };
  
  // Movendo os cálculos para dentro da função updateValores
  let bonus = 0;

  if (!apenasReparo) {
    if (value2 === 700) {
      bonus = 1700;
    } else if (value2 === 600) {
      bonus = 1500;
    } else if (value2 === 500) {
      bonus = 1300;
    } else if (value2 === 400) {
      bonus = 1100;
    } else if (value2 === 250) {
      bonus = 900;
    } else if (value2 === 650) {
      bonus = 1000;
    }
  }

  const result1 = value1 * value2;
  const result2 = QTDlockpick * 600 + QTDflipper * 1200 + QTDkit * 600 + QTDkm + QTDbateria * 1 + QTDalicate * 900 + QTDoleo * 1200 + QTDchave * 10 + ReparoFora * 50 + QTDpneu * 50 + QTDcinto * 50 + bonus;
  const result = result1 + result2;
  const valorAprendiz = result * 0.50;
  const valorMaquinaAprendiz = result - valorAprendiz;
  const valorMaoAprendiz = result - valorMaquinaAprendiz;
  // valor com desconto aplicado
  const resultDesconto = result * QTDdesconto;
  const resultComDesconto = result - resultDesconto;



  console.log('Debug updateValores:');
  console.log('QTDlockpick:', QTDlockpick);
  console.log('QTDflipper:', QTDflipper);
  console.log('QTDkm:', QTDkm);
  console.log('result:', result);
  console.log('valorAprendiz:', valorAprendiz);
  console.log('valorMaquinaAprendiz:', valorMaquinaAprendiz);
  console.log('valorMaoAprendiz:', valorMaoAprendiz);

  const [vendedor, setVendedor] = React.useState('');
  const [cliente, setCliente] = React.useState('');


  const [formData, setFormData] = React.useState({
    custumizador: '',
    tipo: 0,
    quantidade: 0,
    desgastado: 1,
    QTDlockpick: 0,
    QTDflipper: 0,
    QTDchave: 0,
    QTDalicate: 0,
    QTDkit: 0,
    QTDoleo: 0,
    QTDbateria: 0,
    QTDpneu: 0,
    ReparoFora: 0,
    QTDdesconto: 1,
    QTDkm: 0,
    QTDcinto: 0,
    valorEmpresa: 0,
    valorMaoDeObra: 0,
    result: 0, 
    role: 'GERENTE',
    apenasReparo: true,
  });

  console.log({formData})
  const handleVendedorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVendedor(e.target.value);
  };

  const handleNumero2Change = (e: SelectChangeEvent) => {
    const tipoValue = Number(e.target.value);
    setValue2(tipoValue);
    setFormData((prevData) => ({ ...prevData, tipo: tipoValue }));
  };

  const handleDesgastadoChange = (e: SelectChangeEvent) => {
    const newDesgastado = Number(e.target.value);
    setDesgastado(newDesgastado);
  };


  const handleNumero1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(Number(e.target.value));
  };
  

  const handleQTDlockpickChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDlockpick(Number(e.target.value));
  };
  
  const handleQTDflipperChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDflipper(Number(e.target.value));
  };
  
  const handleQTDkitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDkit(Number(e.target.value));
  };

  const handleQTDchaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDchave(Number(e.target.value));
  };
  const handleQTDpneuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDpneu(Number(e.target.value));
  };

  const handleQTDalicateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDalicate(Number(e.target.value));
  };

  const handleQTDoleoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDoleo(Number(e.target.value));
  };

  const handleReparoForaChange = (e: SelectChangeEvent) => {
    setReparoFora(Number(e.target.value));
  };

  const handleQTDbateriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDbateria(Number(e.target.value));
  };

  const handleQTDcintoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQTDcinto(Number(e.target.value));
  };

  const handleQTDdescontoChange = (e: SelectChangeEvent) => {
    setQTDdesconto(Number(e.target.value));
  };

  
  const handleQTDkmChange = (e: SelectChangeEvent) => {
    setQTDkm(Number(e.target.value));
  };

  const handleApenasReparoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApenasReparo(event.target.checked);
    setValue1(Number(1));
  };

  const updateValores = (tipo: number, quantidade: number) => {
    const result1 = value1 * formData.tipo;
    const result2 = QTDlockpick * 600 + QTDflipper * 1200 + QTDkit * 600 + QTDkm  + QTDbateria * 1 + QTDalicate * 900 + QTDoleo * 1200 + QTDchave * 10 + ReparoFora * 50 + QTDpneu * 50 + QTDcinto * 50;
    const result = result1 + result2;
    const valorMaoDeObra = result * 0.50;
    // valor com desconto aplicado
    const resultDesconto = result * QTDdesconto;
    const resultComDesconto = result - resultDesconto;

    setFormData({
      ...formData,
      valorEmpresa: result - valorMaoDeObra, // Valor restante após subtrair valorMaoDeObra
      valorMaoDeObra: valorMaoDeObra,
      result: result,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  const result3 = formData.quantidade * formData.tipo;
  const result4 = formData.QTDlockpick * 600 + formData.QTDflipper * 1200 + formData.QTDkit * 600 + formData.QTDkm + formData.QTDbateria * 1 + formData.QTDalicate * 900 + formData.QTDoleo * 1200 + formData.QTDchave * 1 + formData.ReparoFora * 50 + formData.QTDpneu * 50 + formData.QTDcinto * 50;
  const resultTotal = result3 + result4;
  const valorMaoDeObraAprendiz = resultTotal * 0.50;
  // valor com desconto aplicado
  const resultDesconto1 = resultTotal * formData.QTDdesconto;
  const resultComDesconto1 = resultTotal - resultDesconto1;

  formData.custumizador = vendedor;
  formData.quantidade = value1;
  formData.tipo = value2;
  formData.desgastado = desgastado;
  formData.QTDlockpick = QTDlockpick;
  formData.QTDkit = QTDkit;
  formData.QTDalicate= QTDalicate;
  formData.QTDchave = QTDchave;
  formData.QTDoleo = QTDoleo;
  formData.QTDbateria = QTDbateria;
  formData.QTDpneu = QTDpneu;
  formData.ReparoFora = ReparoFora;
  formData.QTDcinto = QTDcinto;
  formData.QTDkm = QTDkm;
  formData.QTDflipper = QTDflipper;
  formData.result = resultTotal;
  formData.valorMaoDeObra = valorMaoDeObraAprendiz;
  formData.valorEmpresa = resultTotal - valorMaoDeObraAprendiz;
  formData.role = "GERENTE";
  formData.apenasReparo = apenasReparo;

    
  
    // Remova as linhas que definem formData.result, formData.tipo e formData.quantidade aqui.
  
    const formDataValid = isFormValid();

    if (!formDataValid) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 405) {
        console.error('Método não permitido. Verifique a configuração do servidor.');
        alert('Erro no servidor. Tente novamente mais tarde.');
        setError(true);
      } else if (response.ok) {
        const content = await response.json();
        console.log(content);
        alert('Pedido registrado com sucesso!!');
        setSuccess(true);
        window.location.reload();
        setTimeout(function(){
          setSuccess(false)// you can pass true to reload function to ignore the client cache and reload from the server
      },2000);

      } else {
        // Se a resposta do servidor não for bem-sucedida, trata o erro
        const errorContent = await response.json();
        console.error('Erro na API:', errorContent);
        alert('Erro ao enviar o formulário. Verifique os dados e tente novamente.');
        setError(true);
        setTimeout(function(){
          setError(false)// you can pass true to reload function to ignore the client cache and reload from the server
      },2000);
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar o formulário. Verifique a conexão e tente novamente.');
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  

  const result3 = formData.quantidade * formData.tipo;
  const result4 = formData.QTDlockpick * 600 + formData.QTDflipper * 1200 + formData.QTDkit * 600 + formData.QTDkm + formData.QTDbateria * 1 + formData.QTDalicate * 900 + formData.QTDoleo * 1200 + formData.QTDchave * 1 + formData.ReparoFora * 50 + formData.QTDpneu * 50 + formData.QTDcinto * 50;
  const resultTotal = result3 + result4;
  const valorMaoDeObraAprendiz = resultTotal * 0.50;
  // valor com desconto aplicado
  const resultDesconto1 = resultTotal * formData.QTDdesconto;
  const resultComDesconto1 = resultTotal - resultDesconto1;

  formData.custumizador = vendedor;
  formData.quantidade = value1;
  formData.tipo = value2;
  formData.desgastado = desgastado;
  formData.QTDlockpick = QTDlockpick;
  formData.QTDkit = QTDkit;
  formData.QTDalicate= QTDalicate;
  formData.QTDchave = QTDchave;
  formData.QTDoleo = QTDoleo;
  formData.QTDbateria = QTDbateria;
  formData.QTDpneu = QTDpneu;
  formData.ReparoFora = ReparoFora;
  formData.QTDcinto = QTDcinto;
  formData.QTDkm = QTDkm;
  formData.QTDflipper = QTDflipper;
  formData.result = resultTotal;
  formData.valorMaoDeObra = valorMaoDeObraAprendiz;
  formData.valorEmpresa = resultTotal - valorMaoDeObraAprendiz;
  formData.role = "GERENTE";
  formData.apenasReparo = apenasReparo;

      // button loading submit

      const [loading, setLoading] = React.useState(false);
      const [success, setSuccess] = React.useState(false);
      const [error, setError] = React.useState(false);
      const timer = React.useRef<number>();

      const buttonSx = {
            ...(success && {
              bgcolor:  green[400],
              '&:hover': {
                bgcolor: green[400],
              },
            }),
          };

          React.useEffect(() => {
            return () => {
              clearTimeout(timer.current);
            };
          }, []);

          const handleButtonClick = (event: React.FormEvent) => {
            if (!loading) {
              setSuccess(false);
              setLoading(true);
              setError(false);
          
              handleSubmit(event); // Chama a submissão do formulário passando o evento
            }
          };
          // termina aqui 

      const [checked, setChecked] = React.useState(false);     
      const [myData, setMyData] = React.useState<number>(0);

      
      const handleMenuItemClick = (value: number) => {
        setValue2(value);
      };
      

  return (
      
      <main className={styles.main}>
      <Head>
        <title>Calculadora DigitalDen</title>
        <link rel="icon" href="/hayes.webp" />
      </Head>
        <div className={styles.containerBox}>
          <div className={styles.box1}>  
            <div className={styles.boxTitulo}>
              <h1>Calculadora DigitalDen</h1>
            </div>
            <div className={styles.boxInputs1}>            
              <form className={styles.box2} onSubmit={handleSubmit}>
                <FormControl sx={{ m: 1, width: '20ch' }}>
                      <TextField
                          value={formData.custumizador}
                          onChange={handleVendedorChange}
                          id="filled-number"
                          label="Nome do Funcionario"
                          name='custumizador'
                          type="text"
                          variant="standard"
                        />
                </FormControl>

                <FormControl>
                  <FormControlLabel control={<Checkbox checked={apenasReparo} onChange={handleApenasReparoChange} />} label="Apenas Reparo" />
                </FormControl>

                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                      value={value1}
                      onChange={handleNumero1Change}
                      id="filled-number"
                      label="Quantidade"
                      
                      name='quantidade'
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                    />
                </FormControl>
                
                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                    value={QTDlockpick}
                    onChange={handleQTDlockpickChange}
                    id="filled-number"
                    label="QTD Carregador"
                    name="QTDlockpick"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                    value={QTDflipper}
                    onChange={handleQTDflipperChange}
                    id="filled-number"
                    label="QTD Radio"
                    name="QTDflipper"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                    value={QTDkit}
                    onChange={handleQTDkitChange}
                    id="filled-number"
                    label="QTD VPN"
                    name="QTDkit"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                    value={QTDoleo}
                    onChange={handleQTDoleoChange}
                    id="filled-number"
                    label="QTD Celular"
                    name="QTDoleo"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                    value={QTDchave}
                    onChange={handleQTDchaveChange}
                    id="filled-number"
                    label="Secret"
                    name="QTDkit"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                    value={QTDalicate}
                    onChange={handleQTDalicateChange}
                    id="filled-number"
                    label="QTD Tablet"
                    name="QTDalicate"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: '20ch' }}>
                  <TextField
                    value={QTDbateria}
                    onChange={handleQTDbateriaChange}
                    id="filled-number"
                    label="Secret"
                    name="QTDbateria"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="standard"
                  />
                </FormControl>





                
                

                <FormControl variant='standard' sx={{ m: 1, width: '20ch' }}>
                  <InputLabel id="demo-simple-select-label">Teve Delivery?</InputLabel>
                  <Select
                    type='number'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleQTDkmChange}
                    value={String(QTDkm)}
                    name="ReparoFora"
                    label="Teve Delivery?"                    
                  >
                    <MenuItem value={0}>Não Teve</MenuItem>
                    <MenuItem value={50}>Sul</MenuItem>
                    <MenuItem value={70}>Sandy</MenuItem> 
                    <MenuItem value={70}>Paleto</MenuItem>        
                  </Select>
                </FormControl>


                <FormControl variant='standard' sx={{ m: 1, width: '20ch' }}>
                  <InputLabel id="demo-simple-select-label">Tem cupom?</InputLabel>
                  <Select
                    type='number'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleQTDdescontoChange}
                    value={String(QTDdesconto)}
                    name="desgastado"
                    label="Quantidade de desconto"                    
                  >
                    <MenuItem value={1}>Não tem</MenuItem>      
                    <MenuItem value={0.10}>10%</MenuItem>
                    <MenuItem value={0.15}>15%</MenuItem>      
                    <MenuItem value={0.20}>20%</MenuItem>     
                    <MenuItem value={0.50}>50%</MenuItem>       
                  </Select>
                </FormControl>
                  <div className={styles.boxInputs2}>              
                    <input value={formData.result} type="hidden" name="result" id="" />
                    <input value={formData.quantidade} type="hidden" name="quantidade" id="" />
                    <input value={formData.tipo} type="hidden" name="tipo" id="" />
                    <input value={QTDlockpick} type="hidden" name="QTDlockpick" id="" />
                    <input value={QTDflipper} type="hidden" name="QTDflipper" id="" />
                    <input value={QTDalicate} type="hidden" name="QTDalicate" id="" />
                    <input value={QTDchave} type="hidden" name="QTDchave" id="" />
                    <input value={QTDoleo} type="hidden" name="QTDoleo" id="" />
                    <input value={QTDbateria} type="hidden" name="QTDbateria" id="" />
                    <input value={ReparoFora} type="hidden" name="ReparoFora" id="" />
                    <input value={QTDkit} type="hidden" name="QTDkit" id="" />
                    <input value={QTDkm} type="hidden" name="QTDkm" id="" />
                  </div>   
                  <div className={styles.btnBox}>
                    <Button
                      variant="outlined"
                      sx={buttonSx}
                      type="submit"
                      disabled={loading}
                      onClick={handleButtonClick}
                    >
                      {loading ? 'Enviando...' : success ? 'Sucesso!' : error ? 'Falha ao Enviar' : 'Registrar Pedido'}
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          color: blue[500],
                          position: 'relative',
                          bottom: '-5px',
                          right: '10%',
                          marginLeft: '-12px',
                        }}
                      />
                    )}    
                  </div>
              </form>
            </div>                                                     
          </div>
          <section className={styles.sectionTotal}>
              <div className={styles.boxTotal}>
                <div>
                  <h1>GERENTE</h1>
                  <h2>VALOR TOTAL</h2>
                </div> 
                <div>
                  <p>${result}</p>
                </div>              
                {resultComDesconto !== 0 &&(
                  <div>
                    <div>
                      <h2>VALOR COM DESCONTO</h2>
                    </div>
                    <div>
                      <p>${resultComDesconto}</p>
                    </div>
                  </div>
                  
                )}
              </div>   
          </section>             
        </div>
        <footer className={styles.assinatura}>
          <p>© Feito por <a target='_blank' href="https://www.twitch.tv/yunorp_">YunoRP_</a></p>
        </footer>
      </main>
  )
}
