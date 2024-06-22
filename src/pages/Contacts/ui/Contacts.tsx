import { Typography } from "@/shared/ui";

export const Contacts = () => {
  return (
    <section className="px-[10px] my-[40px] flex flex-col gap-[30px]">
      <Typography variant="textM">
        Если у Вас возникли вопросы, то можете позвонить по телефону{" "}
        <span className="text-textL">+7 (999) 123-45-67</span> (будние дни, с 8
        по 19:00 по московскому времени) <br /> или написать нам на почту{" "}
        <span className="text-textL">support@dvakapitana.ru</span>, или в форму{" "}
        <span className="text-textL">Свяжитесь со мной”</span>“.
      </Typography>
      <div className="flex flex-col gap-[10px]">
        <Typography variant="textXXl">Фактический адрес</Typography>
        <Typography variant="textM">
          636037, Томская область, город Северск, ул. Калинина, д. 42, пом. 519
        </Typography>
      </div>
      <div className="flex flex-col gap-[10px]">
        <Typography variant="textXXl">Реквизиты</Typography>
        <Typography variant="textM">
          Общество с ограниченной ответственностью «ДВА КАПИТАНА» <br /> ИНН
          7024039867
          <br /> КПП 702401001
          <br /> ОГРН 1157024000396
          <br /> Юридический адрес: 636037, Томская область, город Северск, ул.
          Калинина, д. 42, пом. 519
        </Typography>
      </div>
    </section>
  );
};
