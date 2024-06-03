import { Typography } from "@/shared/ui";

export const Agreement = () => {
  return (
    <section className="max-xl:padding flex flex-col gap-10 max-w-[794px] my-[40px]">
      <Typography variant="textM">
        Своей волей и в своем интересе Я даю согласие на обработку, в т.ч. на
        сбор, систематизацию, накопление, хранение, уточнение, обновление,
        изменение, использование, обезличивание, блокирование, уничтожение, моих
        персональных данных, которые включают, но не ограничиваются следующими
        персональными данными: ФИО, e-mail, телефон.
      </Typography>
      <Typography variant="textM">
        Я согласен(на), что мои персональные данные будут обрабатываться
        способами, соответствующими целям обработки персональных данных, в т.ч.
        с использованием средств автоматизации или без использования таких
        средств. А также я согласен(на) с тем, что согласие, данное мной в
        электронной форме на сайте, является согласием, полностью отвечающим
        требованиям законодательства о персональных данных и позволяющим
        подтвердить факт его получения для последующей обработки сотрудниками
        компании ООО “Два капитана”.
      </Typography>
    </section>
  );
};
